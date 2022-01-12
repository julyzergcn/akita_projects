## commands

    ng new -st --routing --style=css --skip-git --minimal akita_projects

    npm install @datorama/akita
    npm install @datorama/akita-ng-entity-service
    npm install @datorama/akita-ng-router-store
    npm install @datorama/akita-ngdevtools --save-dev

    ng g component home
    ng g module todos --module=app --route=todos --routing
    ng g ./akita:feature --flat=false --entityService="Http" todos

    ng g component todos/add-todo


## install akita from source (Do not use)

    git clone https://github.com/datorama/akita.git
    cd akita && npm i && npm run build
    cd packages/akita-schematics && npm i && npm run build
    cd ../../..
    npm i akita/dist/packages/akita
