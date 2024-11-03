# Junaid's Stock Viewer

Just messing around

## SETUP

## Cloning
```bash
git clone https://github.com/Junaid2005/stock_viewer.git
```
## Frontend
### Prerequisites
Before you begin, ensure you have met the following requirements: 
 - **Node.js**: You need Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/). 
 - **Angular CLI**: Install Angular CLI globally by running the following command: `npm install -g @angular/cli`
 
Next navigate into the apps directory:
```bash 
cd stock-viewer/frontend/security-app`
```
 Once that is complete install the necessary dependencies:
```bash
npm install
```

Then, you can start:
```bash 
npm run start
```
## Backend
In a new terminal, navigate into the backend:
```bash
cd stock-viewer/backend
```
### Virtual Environment 
```bash
python -m venv venv
``` 

Activate your virtual environment
#### Windows:
```bash
venv\Scripts\activate
```
#### macOS/Linux: 
```bash
source venv/bin/activate
```

### Installing Dependencies
```bash
pip install -r main/requirements.txt
```

Once that is done, run the backend
```bash
python main/backend.py
```

## CHANGELOG

### 03/11/2024
- Fixed date formatting on graph
- Text aligned 3 facts for security to the right
- Removed venv for the repo
- Added requirements.txt
- Added setup instructions

## KNOWN BUGS

- Since the x axis has been changed to index and not date, if a security's pricing didnt start at the same time as one it is being compared to the graph is completely wrong. Mainly an issue for newer companies, pretty much always an issues on 'Max' tab

## BACKEND

Uses yfinance

## FRONTEND

Uses angular and ngx charts

## DEPENDENCIES
### BACKEND 
Can be found in 
```bash
backend/main/requirements.txt
```

### FRONTEND
{need to write properly}
Uses ngx-charts

## TODO
- Logger module
- Snackbar module
- Theming
- Ui nicing

- More security support
- Fix open close
- Models file
- Open close line on graph
- X axis formatting
- Some prices come in at like 4.5 when they should be 4.50
- Tooltip
