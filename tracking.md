
1. Docker
docker compose up --build

2. install on VS plungin database client
once installed, configure the postgres database 

3. create tables and fill them


4. shadcn

shadcn (Nodejs dependency needed)
- link https://ui.shadcn.com/docs/installation/next
docs >> installation 
```bash
npx shadcn@latest init
```

5. install llama
ollama run llama3.2:3b

6. install dependecies 
 npm i sequelize pg pg-hstore


7. add componenets using shadcn
npx shadcn@latest add button
npx shadcn@latest add input 
npx shadcn@latest add card



## rerun 
docker compose up

npm run dev 




## chatting with the models 

ollama list
ollama run llama3.2:3b

curl http://localhost:11434/api/tags


curl http://localhost:11434/api/chat -d '{
  "model": "llama3",  
  "messages": [
    { "role": "user", "content": "SELECT all users from a users table" }
  ]
}' -H "Content-Type: application/json"


curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2:3b",  
  "messages": [
    { "role": "user", "content": "SELECT all users from a users table" }
  ]
}' -H "Content-Type: application/json"

