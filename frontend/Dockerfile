# todos-backend-image
from node:16
workdir /app
copy yarn.lock package.json ./
run npm install yarn
run yarn install
copy . .
run yarn build
cmd node
