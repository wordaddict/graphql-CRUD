const _ = require("lodash");
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Company = require('../data/company.js');
let nextId = 5;

const ADD_COMPANY = 'New company added';
const EDIT_COMPANY = 'Company edited'
const DELETE_COMPANY = 'Company deleted'

const resolvers = {
    Query: {
        Companies: () => {
            return Company;
        },
        Company: (root, { id }) => {
            return Company.find(c => c.id == id);
        },
    },
    Mutation: {
        addCompany: (root, { name }) => {
            const newCo = { id: nextId++, name: name };
            Company.push(newCo);
            pubsub.publish(ADD_COMPANY, { companyAdded: newCo });
            return newCo;
        },
        updateCompany: (root, { id, name }) => {
            const updateCo = { id: id, name: name };
            let findId = Company.findIndex(c => c.id == id);
            let update = Company.splice(findId, 1, updateCo);
            pubsub.publish(EDIT_COMPANY, { companyEdited: updateCo });
            return updateCo;
        },
        deleteCompany: (root, { id }) => {
            let deleteCo = Company.find(c => c.id == id);
            _.remove(Company, deleteCo);
            pubsub.publish(DELETE_COMPANY, { companyDeleted: deleteCo });
            return deleteCo;
        },
    },
};

module.exports = resolvers;