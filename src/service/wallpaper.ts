import { http } from '@/utils/http'

/** 轮播图数据 */
export interface BannerItem {
  _id: string
  picurl: string
  target: string
  url?: string
}

/** 壁纸数据 */
export interface WallPaperItem {
  _id: string
  classid: string
  smallPicurl: string
  picurl?: string
  createTime: number
  score: string
  nickname: string
  description?: string
  view_count?: number
  tabs?: string[]
}

/** 分类数据 */
export interface ClassifyItem {
  _id: string
  name: string
  picurl: string
  select: boolean
  createTime: number
  desc?: string
}

/** 资讯数据 */
export interface NewsItem {
  _id: string
  title: string
  picurl?: string
  publish_date: number
  view_count: number
  author: string
  select: boolean
}

/** 获取首页轮播图 */
export const getHomeBanner = () => {
  return http<BannerItem[]>({
    url: '/homeBanner',
    method: 'GET',
  })
}

/** 获取随机/推荐壁纸 */
export const getWallList = (
  params: { classid?: string; pageNum?: number; pageSize?: number } = {},
) => {
  return http<WallPaperItem[]>({
    url: '/wallList',
    method: 'GET',
    query: params,
  })
}

/** 获取随机壁纸 */
export const getRandomWall = () => {
  return http<WallPaperItem[]>({
    url: '/randomWall',
    method: 'GET',
  })
}

/** 获取分类列表 */
export const getClassify = (
  params: { select?: boolean; pageNum?: number; pageSize?: number } = {},
) => {
  return http<ClassifyItem[]>({
    url: '/classify',
    method: 'GET',
    query: params,
  })
}

/** 获取壁纸资讯 */
export const getWallNewsList = (
  params: { select?: boolean; pageNum?: number; pageSize?: number } = {},
) => {
  return http<NewsItem[]>({
    url: '/wallNewsList',
    method: 'GET',
    query: params,
  })
}

/** 获取用户壁纸 (下载/评分) */
export const getUserWallList = (params: {
  type: 'download' | 'score'
  pageNum?: number
  pageSize?: number
}) => {
  return http<WallPaperItem[]>({
    url: '/userWallList',
    method: 'GET',
    query: params,
  })
}

/** 搜索壁纸 */
export const searchWall = (params: {
  keyword: string
  pageNum?: number
  pageSize?: number
}) => {
  return http<WallPaperItem[]>({
    url: '/searchWall',
    method: 'GET',
    query: params,
  })
}
