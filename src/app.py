import pymongo 
import pandas as pd 
import os
print("Current Working Directory:", os.getcwd())
mongoURI='mongodb://localhost:27017/PatientData'

client=pymongo.MongoClient(mongoURI)
db=client["PatientData"]
collection=db["patientdatas"]

data=list(collection.find())

if not data: 
    print("No data is found in the collection.")
    exit()
    
df=pd.DataFrame(data)
 
if'_id' in df.columns: 
    df.drop(columns=['_id'],inplace=True)
    
output_file="NGO_PATIENT_DATA.xlsx"

df.to_excel(output_file,index=False,engine='openpyxl')

print(f"Data Successfully written to  {output_file}")