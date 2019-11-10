const Handlebars = require('handlebars');

function render(rawTemplate, data) {
    const template = Handlebars.compile(rawTemplate);
    const result = template(data);

    return result;
}

module.exports = {
    render,   
}
