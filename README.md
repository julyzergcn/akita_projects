## commands

    ng new -st --routing --style=css --skip-git --minimal akita_projects

    npm install @datorama/akita-ng-entity-service
    npm install @datorama/akita-ng-router-store
    npm install @datorama/akita-ngdevtools --save-dev

    git clone https://github.com/datorama/akita.git
    cd akita && npm i && npm run build
    cd packages/akita-schematics && npm i && npm run build
    cd ../../..
    npm i akita/dist/packages/akita

    ng g component home
    ng g module todos --module=app --route=todos --routing
    ng g @datorama/akita:feature todos --flat=false --entityService="Http"

