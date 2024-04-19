import { Container } from 'pixi.js'
import * as Helper from '../helper'
import * as Constant from '../constants'
import * as MenuContainer from './menu'
import * as GameContainer from './game'

export function create (context) {
  const container = new Container()

  const loseButton = Helper.Graphics.createButton(context.textures[13], Constant.LOSE_MESSAGE, Constant.WIDTH_CENTER, 100, () => {
  })

  const resetButton = Helper.Graphics.createButton(context.textures[13], Constant.RESET_BUTTON_MESSAGE, Constant.WIDTH_CENTER, 200, () => {
    GameContainer.resetCurrentGame(context)
  })

  const backButton = Helper.Graphics.createButton(context.textures[13], Constant.BACK_BUTTON_MESSAGE, Constant.WIDTH_CENTER, 300, () => {
    MenuContainer.show(context)
  })

  container.addChild(loseButton, resetButton, backButton)
  context.containers.gameOverContainer = container
}
