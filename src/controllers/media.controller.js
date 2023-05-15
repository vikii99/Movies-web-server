import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js"
import userModel from "../models/user.model.js";
import favouriteModel from "../models/favourite.model.js"
import reviewModel from "../models/review.model.js"
import tokenMiddleware from "../middlewares/token.middleware.js"

const getList = async (req, res) => {
    try{
        const {page} = req.query
        const {mediaType, mediaCategory} = req.params
        const response = await tmdbApi.mediaList({mediaType,mediaCategory,page})
        return responseHandler.ok(res, response)
    }catch{
        responseHandler.error(res)
    }
}
const getGenres = async (req, res) => {
    try{
        const {mediaType} = req.params
        const response = await tmdbApi.mediaGenres({mediaType})
        return responseHandler.ok(res, response)
    }catch{
        responseHandler.error(res)
    }
}
const search = async (req, res) => {
    try{
        const {mediaType} = req.params
        const {query, page} = req.query
        const response = await tmdbApi.mediaSearch({query, page, mediaType: mediaType === "people" ? "person" : mediaType})
        return responseHandler.ok(res, response)
    }catch{
        responseHandler.error(res)
    }
}

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const media = await tmdbApi.mediaDetail({ mediaType, mediaId });
    media.credits = await tmdbApi.mediaCredits({mediaType,mediaId})
    media.vidoes = await tmdbApi.mediaVideos({mediaType,mediaId})
    const recommend = await tmdbApi.mediaRecommend({mediaType,mediaId})
    media.recommend = recommend.results
    media.images = await tmdbApi.mediaImages({ mediaType, mediaId });

    const tokenDecoded = tokenMiddleware.tokenDecode(req)
    if(tokenDecoded){
        const user = await userModel.findById(tokenDecoded.data)
        if(user){
            const isFavourite = await favouriteModel.findOne({user: user.id, mediaId})
            media.isFavourite = isFavourite !== null
        }
    }
    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
    responseHandler.ok(res, media)

  } catch {
    responseHandler.error(res);
  }
};

export default {
    getDetail, getGenres, getList, search
}
