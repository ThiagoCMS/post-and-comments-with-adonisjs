import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({}: HttpContextContract) {
    return Post.query().preload('comments')
  }

  public async store ({request}: HttpContextContract) {
    const { content, author } = request.body()
    const post = await Post.create({ content, author })
    return post
  }

  public async show ({request, response}: HttpContextContract) {
    const { id } = request.params()
    const post = await Post.query().where('id', id).preload('comments')
    if (!post) {
      return response.notFound()
    }
    return post
  }

  public async update ({request, response}: HttpContextContract) {
    const { id } = request.params()
    const { content } = request.body()
    const post = await Post.findBy('id', id)
    if (!post) {
      return response.notFound()
    }
    post.content = content
    await post.save()
    return post
  }

  public async destroy ({request, response}: HttpContextContract) {
    const { id } = request.params()
    const post = await Post.findBy('id', id)
    if (!post) {
      return response.notFound()
    }
    await post.delete()
    return post
  }
}
