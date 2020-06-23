const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

let blogPosts = [{
    title: 'How to make website',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in erat ut lorem aliquam pharetra. Sed eget eros vitae magna pellentesque ultricies. Nullam bibendum effic odio nec condimentum. Phasellus vel pellentesque est. Quisque lobortis vel orci ut vestibulum. Proin risus tellus, gravida ac dignissim vitae, volutpat cursus dui. Fusce tempus diam libero, sed mollis nunc sodales sit amet. Nunc cursus accumsan erat a sollicitudin. Donec egestas consectetur risus a porta. Donec vitae feugiat turpis. Mauris malesuada sapien sed urna posuere, ut rutrum magna dignissim. Vivamus odio tellus, ultricies sit amet metus ut, lacinia luctus velit. Fusce ullamcorper tortor a lectus consectetur tincidunt. Sed id elit neque. Integer odio magna, laoreet nec venenatis vitae, dapibus in justo.'
}]

app.get('/', (req, res) => {
    res.render('home', {
        posts: blogPosts
    });
})

app.get('/post/:postName', (req, res) => {
    const parameter =  _.kebabCase(req.params.postName);
    blogPosts.forEach(v => {
        const {title, content} = v;
        if(_.kebabCase(title) === parameter){
            res.render('detail', {
                title, content
            })
        }
    })

})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/create', (req, res) => {
    res.render('create');
})

app.post('/create', (req, res) => {
    const {
        title,
        content
    } = req.body;
    blogPosts.push({
        title: title,
        content: content
    })
    res.redirect('/')
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));