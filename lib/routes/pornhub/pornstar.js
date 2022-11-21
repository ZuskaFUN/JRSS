const got = require('@/utils/got');
const cheerio = require('cheerio');
const { toTitleCase } = require('@/utils/common-utils');

module.exports = async (ctx) => {
    const mainweb = 'https://www.pornhub.com';
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
    const titulo = username.replace('-', ' ');

    ctx.state.data = {
        title: toTitleCase(titulo),
        link,
        item:
            list &&
            list
                .map((_, e) => {
                    e = $(e);

                    let title_path = e.find('span.title a');
                    let title_text = title_path.text();
                    let item_link = mainweb + title_path.attr('href');
                    let img_src = e.find('img').attr('src');
                    let vid_url = mainweb + `/embed/` + item_link.substring(item_link.lastIndexOf("=") + 1);
                    

                    return {
                        title: title_text,
                        link: item_link,
                        description: `<img src="${img_src}">`,
                        enclosure_url: vid_url,
                        enclosure_length: 6969,
                        enclosure_type: `video/mpeg`,
                        media: vid_url,
                    };
                })
                .get(),
    };
};
