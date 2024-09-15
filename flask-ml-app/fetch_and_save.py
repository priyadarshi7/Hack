import pandas as pd
from understatapi import UnderstatClient

def fetch_player_data(player_id, csv_file):
    try:
        # Initialize the Understat API client
        with UnderstatClient() as understat:
            # Fetch player data
            player_data = understat.player(player=player_id).get_shot_data()
            
            # Convert JSON data to DataFrame
            df = pd.json_normalize(player_data)
            
            # Write DataFrame to CSV file
            df.to_csv(csv_file, index=False)
            print(f"Data saved to {csv_file}")
    
    except Exception as e:
        print(f"Error fetching player data: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python fetch_and_save.py <player_id> <output_csv>")
        sys.exit(1)
    
    player_id = sys.argv[1]
    csv_file = sys.argv[2]
    fetch_player_data(player_id, csv_file)
