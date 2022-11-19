const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://jrssfeeder.herokuapp.com/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const special = $('#ming-xie-special-sponsors').next('p').find('a');
    const normal = $('#ming-xie-sponsors').next('p').find('a');

    ctx.state.data = {
        title: 'JRSS',
        link: 'https://jrssfeeder.herokuapp.com/',
        item: special
            .map((index, item) => {
                item = $(item);
                const title = item.find('img').attr('alt');
                const link = item.attr('href') || 'https://jrssfeeder.herokuapp.com/';
                return {
                    title,
                    description: `<a href="${link}">${title}</a><br><img src="${item.find('img').attr('src')}">`,
                    link,
                };
            })
            .get()
            .concat(
                normal
                    .map((index, item) => {
                        item = $(item);
                        item.find('span').remove();
                        const title = item.text();
                        const link = item.attr('href') || 'https://jrssfeeder.herokuapp.com/';
                        return {
                            title,
                            description: `<a href="${link}">${title}</a>`,
                            link,
                        };
                    })
                    .get()
            ),
    };
};
