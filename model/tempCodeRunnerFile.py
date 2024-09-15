import pandas as pd
import warnings

# Suppress FutureWarnings
warnings.simplefilter(action='ignore', category=FutureWarning)

data = pd.read_csv("../flask-ml-app/player_data.csv")
data.head(10)
data.dropna(inplace=True)

data['team_goals'] = data.apply(lambda row: row['h_goals'] if row['h_a'] == 'h' else row['a_goals'], axis=1)
data['opponent_goals'] = data.apply(lambda row: row['a_goals'] if row['h_a'] == 'h' else row['h_goals'], axis=1)
data['is_leading'] = (data['team_goals'] > data['opponent_goals']).astype(int)
data['score_diff'] = data['team_goals'] - data['opponent_goals']
data['score_diff_abs'] = data['score_diff'].abs()
data
df=data[['minute','X','Y','xG','situation','lastAction','team_goals','opponent_goals','is_leading','score_diff','score_diff_abs','shotType']]
situation_mapping = {
    'OpenPlay': 3,
    'FromCorner': 2,
    'SetPiece': 1
}

df.loc[:, 'situation'] = df['situation'].map(situation_mapping)

impact_values = {
    'Pass': 0.2,
    'TakeOn': 0.3,
    'HeadPass': 0.4,
    'Cross': 0.6,
    'Throughball': 0.5,
    'Chipped': 0.5,
    'BallRecovery': 0.1,
    'LayOff': 0.3,
    'BallTouch': 0.2,
    'Aerial': 0.4,
    'CornerAwarded': 0.3,
    'Rebound': 0.4,
    'BlockedPass': 0.1
}

df.loc[:, 'lastAction'] = df['lastAction'].map(impact_values)


from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
df.loc[:, 'minute'] = scaler.fit_transform(df[['minute']])
df.loc[:, 'score_diff'] = scaler.fit_transform(df[['score_diff']])
df.loc[:, 'team_goals'] = scaler.fit_transform(df[['team_goals']])

df_encoded = pd.get_dummies(df, columns=['shotType'], drop_first=True)
df_encoded = df_encoded.drop(['opponent_goals','score_diff_abs','shotType_LeftFoot'], axis=1)

import pandas as pd
from sklearn.model_selection import train_test_split
X = df_encoded.drop('xG', axis=1)
y = df_encoded['xG']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.ensemble import VotingRegressor
from catboost import CatBoostRegressor
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor, HistGradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Assuming df_encoded is your pre-processed DataFrame
X = df_encoded.drop('xG', axis=1)
y = df_encoded['xG']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define a pipeline with imputer and scaler (optional)
preprocessor = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),  # Handle missing values
    ('scaler', StandardScaler())  # Optional, can be removed if scaling is not required
])

# Apply preprocessing
X_train_preprocessed = preprocessor.fit_transform(X_train)
X_test_preprocessed = preprocessor.transform(X_test)

# Initialize the base models with the best hyperparameters
catboost = CatBoostRegressor(
    learning_rate=0.0452658921624846,
    depth=9,
    iterations=534,
    l2_leaf_reg=4.24770789696455,
    random_strength=2.994770539601621,
    bagging_temperature=0.12701607951419322,
    border_count=231,
    verbose=0,
    random_state=42
)

hist_gradient_boosting = HistGradientBoostingRegressor(
    learning_rate=0.0070750764215555635,
    max_iter=431,
    max_depth=8,
    max_leaf_nodes=72,
    min_samples_leaf=8,
    l2_regularization=0.8635816554543911,
    random_state=42
)

gradient_boosting = GradientBoostingRegressor(
    n_estimators=251,
    learning_rate=0.013422059634468292,
    max_depth=5,
    min_samples_split=4,
    min_samples_leaf=10,
    random_state=42
)

random_forest = RandomForestRegressor(
    n_estimators=72,
    max_depth=34,
    min_samples_split=9,
    min_samples_leaf=3,
    random_state=42
)


models = [
    ('catboost', catboost),
    ('hist_gb', hist_gradient_boosting),
    ('gradient_boosting', gradient_boosting),
    ('random_forest', random_forest)
]

voting_regressor = VotingRegressor(estimators=models)

# Fit the voting regressor
voting_regressor.fit(X_train_preprocessed, y_train)

# Make predictions
y_pred_voting = voting_regressor.predict(X_test_preprocessed)

# Evaluate the ensemble model
mse_voting = mean_squared_error(y_test, y_pred_voting)
r2_voting = r2_score(y_test, y_pred_voting)

# print("Voting Regressor:")
# print(f"  Mean Squared Error: {mse_voting:.4f}")
# print(f"  R² Score: {r2_voting:.4f}")


import numpy as np
import pandas as pd

# Example of a new data point in original format (without preprocessing)
# Replace the values below with actual values from your new data point
new_data_original = pd.DataFrame({
    'minute': [63],
    'X': [0.534],
    'Y': [0.312],
    'situation': ['OpenPlay'],  # original categorical value
    'lastAction': ['Through'],     # original categorical value
    'team_goals': [2],
    'opponent_goals': [1],
    'is_leading': [1],
    'score_diff': [1],
    'score_diff_abs': [2],
    'shotType': ['RightFoot']    # original categorical value
})

# Apply the same preprocessing steps to the new data point

# Map 'situation' to numerical values
new_data_original['situation'] = new_data_original['situation'].map(situation_mapping)

# Map 'lastAction' to impact values
new_data_original['lastAction'] = new_data_original['lastAction'].map(impact_values)

# Drop 'opponent_goals' and 'score_diff_abs' as in the training data
new_data_original = new_data_original.drop(['opponent_goals', 'score_diff_abs'], axis=1)

# One-hot encode 'shotType' (handle categorical feature)
new_data_original = pd.get_dummies(new_data_original, columns=['shotType'], drop_first=True)

# Ensure all columns from training data exist in the new input, fill any missing columns with 0
for col in df_encoded.columns:
    if col not in new_data_original.columns and col != 'xG':
        new_data_original[col] = 0

# Reorder columns to match the training data
new_data_original = new_data_original[df_encoded.drop('xG', axis=1).columns]

# Apply the scaler (this assumes you used MinMaxScaler/StandardScaler in training)
new_data_preprocessed = preprocessor.transform(new_data_original)

# Make a prediction using the trained voting regressor
single_prediction = voting_regressor.predict(new_data_preprocessed)

# Output the prediction
print(f"Prediction for the new data point: {single_prediction[0]:.4f}")