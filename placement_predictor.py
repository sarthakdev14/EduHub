import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Sample Dataset
data = [
    {"college": "IIT Bombay", "branch": "CSE", "avg_package": 32, "median_package": 30},
    {"college": "IIT Delhi", "branch": "CSE", "avg_package": 31, "median_package": 29},
    {"college": "IIT Kanpur", "branch": "CSE", "avg_package": 28, "median_package": 27},
    {"college": "IIT Madras", "branch": "CSE", "avg_package": 27, "median_package": 25},
    {"college": "IIT Kharagpur", "branch": "CSE", "avg_package": 26, "median_package": 24},
    {"college": "IIT Roorkee", "branch": "CSE", "avg_package": 23, "median_package": 22},
    {"college": "IIT Guwahati", "branch": "CSE", "avg_package": 22, "median_package": 21},
    {"college": "IIT Hyderabad", "branch": "CSE", "avg_package": 26, "median_package": 24},
    {"college": "IIT Indore", "branch": "CSE", "avg_package": 24, "median_package": 22},
    {"college": "IIT BHU", "branch": "CSE", "avg_package": 22, "median_package": 21},

    {"college": "IIT Bombay", "branch": "Electrical", "avg_package": 20, "median_package": 18},
    {"college": "IIT Delhi", "branch": "Electrical", "avg_package": 19, "median_package": 18},
    {"college": "IIT Kanpur", "branch": "Electrical", "avg_package": 18, "median_package": 16},
    {"college": "IIT Madras", "branch": "Electrical", "avg_package": 17, "median_package": 15},
    {"college": "IIT Kharagpur", "branch": "Electrical", "avg_package": 16, "median_package": 14},
    {"college": "IIT Roorkee", "branch": "Electrical", "avg_package": 15, "median_package": 13},
    {"college": "IIT Guwahati", "branch": "Electrical", "avg_package": 14, "median_package": 13},
    {"college": "IIT BHU", "branch": "Electrical", "avg_package": 14, "median_package": 12},

    {"college": "IIT Bombay", "branch": "ECE", "avg_package": 21, "median_package": 19},
    {"college": "IIT Delhi", "branch": "ECE", "avg_package": 20, "median_package": 18},
    {"college": "IIT Kanpur", "branch": "ECE", "avg_package": 19, "median_package": 17},
    {"college": "IIT Madras", "branch": "ECE", "avg_package": 18, "median_package": 16},
    {"college": "IIT Kharagpur", "branch": "ECE", "avg_package": 17, "median_package": 15},
    {"college": "IIT Roorkee", "branch": "ECE", "avg_package": 16, "median_package": 14},
    {"college": "IIT Guwahati", "branch": "ECE", "avg_package": 15, "median_package": 13},

    {"college": "IIT Bombay", "branch": "Mechanical", "avg_package": 14, "median_package": 12},
    {"college": "IIT Delhi", "branch": "Mechanical", "avg_package": 13, "median_package": 12},
    {"college": "IIT Kanpur", "branch": "Mechanical", "avg_package": 12, "median_package": 10},
    {"college": "IIT Madras", "branch": "Mechanical", "avg_package": 11, "median_package": 10},
    {"college": "IIT Kharagpur", "branch": "Mechanical", "avg_package": 10, "median_package": 9},

    {"college": "NIT Trichy", "branch": "CSE", "avg_package": 18, "median_package": 16},
    {"college": "NIT Warangal", "branch": "CSE", "avg_package": 17, "median_package": 15},
    {"college": "NIT Surathkal", "branch": "CSE", "avg_package": 16, "median_package": 14},
    {"college": "NIT Calicut", "branch": "CSE", "avg_package": 15, "median_package": 13},
    {"college": "NIT Rourkela", "branch": "CSE", "avg_package": 14, "median_package": 12},

    {"college": "NIT Trichy", "branch": "Electrical", "avg_package": 12, "median_package": 11},
    {"college": "NIT Warangal", "branch": "Electrical", "avg_package": 11, "median_package": 10},
    {"college": "NIT Surathkal", "branch": "Electrical", "avg_package": 10, "median_package": 9},

    {"college": "NIT Trichy", "branch": "ECE", "avg_package": 13, "median_package": 12},
    {"college": "NIT Warangal", "branch": "ECE", "avg_package": 12, "median_package": 11},
    {"college": "NIT Surathkal", "branch": "ECE", "avg_package": 11, "median_package": 10},

    {"college": "NIT Trichy", "branch": "Mechanical", "avg_package": 9, "median_package": 8},
    {"college": "NIT Warangal", "branch": "Mechanical", "avg_package": 8, "median_package": 7},

    {"college": "IIIT Hyderabad", "branch": "CSE", "avg_package": 30, "median_package": 28},
    {"college": "IIIT Bangalore", "branch": "CSE", "avg_package": 22, "median_package": 20},
    {"college": "IIIT Delhi", "branch": "CSE", "avg_package": 21, "median_package": 19},

    {"college": "IIIT Hyderabad", "branch": "ECE", "avg_package": 21, "median_package": 19},
    {"college": "IIIT Bangalore", "branch": "ECE", "avg_package": 18, "median_package": 16},
    {"college": "IIIT Delhi", "branch": "ECE", "avg_package": 17, "median_package": 15},

    {"college": "Delhi Technological University (DTU)", "branch": "CSE", "avg_package": 15, "median_package": 14},
    {"college": "NSUT Delhi", "branch": "CSE", "avg_package": 14, "median_package": 13},

    {"college": "Delhi Technological University (DTU)", "branch": "ECE", "avg_package": 12, "median_package": 11},
    {"college": "NSUT Delhi", "branch": "ECE", "avg_package": 11, "median_package": 10},

    {"college": "Delhi Technological University (DTU)", "branch": "Mechanical", "avg_package": 8, "median_package": 7},
    {"college": "NSUT Delhi", "branch": "Mechanical", "avg_package": 7, "median_package": 6},
]

# Convert into DataFrame
df = pd.DataFrame(data)

# Encode categorical features
label_encoder_college = LabelEncoder()
label_encoder_branch = LabelEncoder()

df["college_encoded"] = label_encoder_college.fit_transform(df["college"])
df["branch_encoded"] = label_encoder_branch.fit_transform(df["branch"])

# Features and Target
X = df[["college_encoded", "branch_encoded"]]
y = df[["avg_package", "median_package"]]

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test Model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error: {mae}")

# Predict for a new entry (e.g., IIT Bombay, Data Science)
sample_college = "IIT Bombay"
sample_branch = "Electrical"

college_code = label_encoder_college.transform([sample_college])[0]
branch_code = label_encoder_branch.transform([sample_branch])[0]

predicted_package = model.predict([[college_code, branch_code]])
print(f"Predicted Avg Package for {sample_college} - {sample_branch}: {predicted_package[0][0]} LPA")
