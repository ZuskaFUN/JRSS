const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const website = 'pornhub';
    const mainweb = 'https://www.${website}.com';
    const username = ctx.params.username;
    // sort by:
    // 'mr', 'mv', 'tr', 'lg', 'cm'
    const sort = ctx.params.sort || 'mr';
    const link = `${mainweb}/pornstar/${username}/videos?o=${sort}`;
    const response = await got.get(link);
    const $ = cheerio.load(response.data);

    // '#uploadedVideosSection', '#trailerVideosSection', '#mostRecentVideosSection', 
    // '#privateVideosSection', '#favVideosSection', '#watchedVideosSection', 
    // '#unlistedVideosSection', '#purchasedVideosSection'
    const list = $('#mostRecentVideosSection .videoBox');

    // const titulo = $('title').first().text();
    const titulo = username.replace('-', ' ').toUpperCase();

    ctx.state.data = {
        title: titulo,
        link,
        item:
            list &&
            list
                .map((_, e) => {
                    e = $(e);

                    return {
                        title: e.find('span.title a').text(),
                        link: mainweb + e.find('span.title a').attr('href'),
                        description: `<img src="${e.find('img').attr('data-mediumthumb')}">`,
                        enclosure_url: mainweb + `/embed/` + link.substring(link.lastIndexOf("=") + 1),
                        enclosure_length: 6969,
                        enclosure_type: `video/mpeg`,
                    };
                })
                .get(),
    };
};
