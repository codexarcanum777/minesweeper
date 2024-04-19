import { Container } from 'pixi.js'
import * as Helper from '../helper'
import * as Constant from '../constants'
import * as MenuContainer from './menu'

export function create (context) {
  const container = new Container()

  const backButton = Helper.Graphics.createButton(context.textures[13], Constant.BACK_BUTTON_MESSAGE, Constant.WIDTH_CENTER, 200, () => {
    MenuContainer.show(context)
  })

  const wonButton = Helper.Graphics.createButton(context.textures[13], Constant.WON_MESSAGE, Constant.WIDTH_CENTER, 100, () => {
  })

  container.addChild(wonButton, backButton)
  context.containers.gameWonContainer = container
}
