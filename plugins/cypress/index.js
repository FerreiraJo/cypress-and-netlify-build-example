const cypress = require('cypress');

module.exports = {
    onSuccess: async ({netlifyConfig}) => {

        const result =  cypress.run({
            config: {
                baseUrl: netlifyConfig.build.environemtn.DEPLOY_PRIME_URL,
            },
            spec: '**/*.{feature,features}',
            env: {
                access_token: process.env.CYPRESS_ACCESS_TOKEN
            }
        })

        if(result.totalFailed){
            const sha = utils.git.commits[0].sha;
            const authorization = `token ${netlifyConfig.build.environment.NETLIFY_BOT_GITHUB_STATUS_TOKEN}`;
            const deployURL = netlifyConfig.build.environment.DEPLOY_PRIME_URL
        
            const response = await fetch(
                `https://api.github.com/repos/netlify/netlify-react-ui/statuses/${sha}`,
                {
                    method: 'POST',
                    headers: {
                        authorization,
                    },
                    body: JSON.stringify({
                        status: 'failure',
                        target_url: deployURL,
                        context: 'cypress',
                        message:'Cypress tests failed',
                    }),
                }
            );
        
        
            const data = await response.json();
            const { status, statusText, ok } = response;
        
            if (!ok) {
                const error = new Error(`${status} ${statusText}`);
                error.data = data;
                throw error;
            }
            return data;
        }
    }
};