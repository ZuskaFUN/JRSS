const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const language = ctx.params.language || 'www';
    const url = ctx.params.url || 'video';
    const link = `https://${language}.pornhub.com/${url}`;

    const response = await got.get(link);
    const $ = cheerio.load(response.data);
    const list = $('#videoCategory .videoBox');

    ctx.state.data = {
        title: $('title').first().text(),
        link,
        item:
            list &&
            list
                .map((_, e) => {
                    e = $(e);

                    return {
                        title: e.find('span.title a').text(),
                        link: `https://www.pornhub.com` + e.find('span.title a').attr('href'),
                        description: `<img src=${e.find('img').attr('data-mediumthumb')}>`,
                    };
                })
                .get(),
    };
};
