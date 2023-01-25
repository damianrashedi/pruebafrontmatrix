import { parseString } from "xml2js"

const corsProxy = "https://api.allorigins.win/get?url=";

const fetchPodcastStream = (url, callback) => {
  podcastStream(url, callback);
};

const podcastStream = (url, callback) => {
  fetch(corsProxy + url)
    .then((res) => res.text()
      .then((data) => parseString(parseData(data), (err, res) => parseStringCallback(err, res, callback)))
      .catch((err) => console.warn("data err", err))
      //.finally(() => console.info("data complete"))
    )
    .catch((err) => console.warn("res err", err));
    //.finally(() => console.info("res complete"));
};

const parseData = (data) => {
  var contents = JSON.parse(data).contents;
  var start_index = contents.indexOf('base64');
  var base_64 = contents.slice(start_index + 7);
  return atob(base_64);
}

const parseStringCallback = (err, res, callback) => {
  if (err) {
    console.warn("ERROR", err);
  } else {
    const entries = res.rss.channel[0].item.map((item) => {
      return cleanParsedXMLEntry(item);
    });
    callback(entries);
  }
};
const cleanParsedXMLEntry = (entry) => {
  return {
    title: entry.title[0],
    date: entry.pubDate[0],
    duration: entry["itunes:duration"]
  };
};

export default fetchPodcastStream;
