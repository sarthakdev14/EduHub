import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor

# Original dataset with 35 entries
large_data = {
    'College': [
        'LD College', 'PSG iTech', 'AC Patil College', 'MIT', 'NIT Trichy',
        'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
        'BITS Pilani', 'VIT Vellore', 'SRM University', 'Amity University', 'Manipal University',
        'Anna University', 'Jadavpur University', 'Shiv Nadar University', 'IIIT Hyderabad', 'IIIT Bangalore',
        'DTU', 'NSIT', 'Jamia Millia Islamia', 'IIT Roorkee', 'IIT Guwahati',
        'IIT BHU', 'IIT Indore', 'IIT Ropar', 'IIT Gandhinagar', 'IIT Patna',
        'IIT Jodhpur', 'IIT Bhubaneswar', 'IIT Mandi', 'IIT Palakkad', 'IIT Tirupati'
    ],
    'Branch': [
        'Computer Engineering', 'CSE', 'Mechanical Engineering', 'CSE', 'Mechanical Engineering',
        'CSE', 'Electrical Engineering', 'Mechanical Engineering', 'CSE', 'Civil Engineering',
        'CSE', 'IT', 'ECE', 'CSE', 'Mechanical Engineering',
        'CSE', 'IT', 'CSE', 'CSE', 'ECE',
        'CSE', 'IT', 'CSE', 'CSE', 'Mechanical Engineering',
        'CSE', 'IT', 'CSE', 'CSE', 'Mechanical Engineering',
        'CSE', 'IT', 'CSE', 'CSE', 'Mechanical Engineering'
    ],
    'Year': [2024] * 35,
    'Cutoff': [
        38202, 1588, 342281, 1083, 31543,
        50, 60, 70, 80, 90,
        150, 250, 350, 450, 550,
        650, 750, 850, 950, 1050,
        1150, 1250, 1350, 1450, 1550,
        1650, 1750, 1850, 1950, 2050,
        2150, 2250, 2350, 2450, 2550
    ]
}

# Additional entries to make it 40
additional_entries = {
    'College': ['IIT Goa', 'IIT Jammu', 'IIT Bhilai', 'IIT Dharwad', 'IIT Dhanbad'],
    'Branch': ['CSE', 'IT', 'ECE', 'Mechanical Engineering', 'Civil Engineering'],
    'Year': [2024] * 5,
    'Cutoff': [2650, 2750, 2850, 2950, 3050]
}

# Combine the original and additional entries
df_original = pd.DataFrame(large_data)
df_additional = pd.DataFrame(additional_entries)
df_combined = pd.concat([df_original, df_additional], ignore_index=True)

# Encode categorical variables
le_college = LabelEncoder()
le_branch = LabelEncoder()
df_combined['College'] = le_college.fit_transform(df_combined['College'])
df_combined['Branch'] = le_branch.fit_transform(df_combined['Branch'])

# Define features (X) and target (y)
X = df_combined[['Year', 'College', 'Branch']]
y = df_combined['Cutoff']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Decision Tree Regressor model
model = DecisionTreeRegressor()
model.fit(X_train, y_train)

# Evaluate the model
print(model.score(X_test, y_test))

# Mock dataset for 2025
mock_data_2025 = {
    'Year': [2025] * 5,
    'College': [31, 36, 0, 32, 34],  # Encoded college values
    'Branch': [2, 0, 6, 0, 6]  # Encoded branch values
}

mock_df_2025 = pd.DataFrame(mock_data_2025)

# Predict cutoffs for the mock dataset of 2025
predicted_cutoffs_2025 = model.predict(mock_df_2025)

# Map encoded values back to actual names
mock_df_2025['College Name'] = mock_df_2025['College'].map({v: k for k, v in dict(zip(le_college.classes_, le_college.transform(le_college.classes_))).items()})
mock_df_2025['Branch Name'] = mock_df_2025['Branch'].map({v: k for k, v in dict(zip(le_branch.classes_, le_branch.transform(le_branch.classes_))).items()})

# Combine with mock dataset for better presentation
mock_df_2025['Predicted Cutoff'] = predicted_cutoffs_2025
print(mock_df_2025[['Year', 'College Name', 'Branch Name', 'Predicted Cutoff']])
