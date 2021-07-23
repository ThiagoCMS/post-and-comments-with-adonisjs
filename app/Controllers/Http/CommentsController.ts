import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async index ({request}: HttpContextContract) {
    const { post_id } = request.params()
    return Comment.query().where('post_id', post_id)
  }

  public async store ({request}: HttpContextContract) {
    const { post_id } = request.params()
    const { content } = request.body()
    const comment = await Comment.create({ content, postId: post_id })
    return comment
  }

  public async show ({request, response}: HttpContextContract) {
    const { post_id, id } = request.params()
    const comment = await Comment.query().where('id', id).andWhere('post_id', post_id).first()
    if (!comment) {
      return response.notFound()
    }
    return comment
  }

  public async update ({request, response}: HttpContextContract) {
    const { post_id, id } = request.params()
    const { content } = request.body()
    const comment = await Comment.query().where('id', id).andWhere('post_id', post_id).first()
    if (!comment) {
      return response.notFound()
    }
    comment.content = content
    await comment.save()
    return comment
  }

  public async destroy ({request, response}: HttpContextContract) {
    const { post_id, id } = request.params()
    const comment = await Comment.query().where('id', id).andWhere('post_id', post_id).first()
    if (!comment) {
      return response.notFound()
    }
    await comment.delete()
    return comment
  }
}
