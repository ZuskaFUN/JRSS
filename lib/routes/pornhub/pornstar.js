const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const language = ctx.params.language || 'www';
    const username = ctx.params.username;
    const sort = ctx.params.sort || 'mr';
    const website = 'pornhub'
    const link = `https://${language}.${website}.com/pornstar/${username}/videos?o=${sort}`;

    const response = await got.get(link);
    const $ = cheerio.load(response.data);
    const list = $('#mostRecentVideosSection .videoBox');
    ///const titulo = $('title').first().text();
    const titulo = username.replace('-',' ').toUpperCase();
    
    ctx.state.data = {
        title: $('titulo'),
        link,
        item:
            list &&
            list
                .map((_, e) => {
                    e = $(e);

                    return {
                        title: e.find('span.title a').text(),
                        link: `https://www.pornhub.com` + e.find('span.title a').attr('href'),
                        description: `<img src="${e.find('img').attr('data-mediumthumb')}">`,
                    };
                })
                .get(),
    };
};
