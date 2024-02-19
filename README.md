template for form builder, seperated into frontend and backend

## Now works with Win11

### Setup

to run backend,

```bash
cd backend
python -m venv venv
pip install -r requrirements.txt
python app.py
```

to run frontend,

```bash
cd frontend
npm install
npm run start
```

The data we are mocking to use is located under `backend\data` in the html format. We are asking questions and allowing GPT to answer them in bulk.
