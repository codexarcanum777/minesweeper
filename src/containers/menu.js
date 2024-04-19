import { Container } from 'pixi.js'
import * as Constant from '../constants'
import * as Helper from '../helper'
import * as GameContainer from './game'

export function buttonMenu (context, config, message, positionY) {
  const button = Helper.Graphics.createButton(context.textures[13], message, Constant.WIDTH_CENTER, positionY, () => {
    [context.x, context.y, context.mines] = config

    Helper.Game.generateMap(context.x, context.y, context.mines).then((result) => {
      [context.map, context.playMap] = result

      GameContainer.show(context)
      GameContainer.init(context)
    })
  })

  return button
}

export function show (context) {
  context.app.stage.removeChildren()
  context.app.stage.addChild(context.containers.menuContainer)
  context.updateContainer = () => {}
  context.renderContainer = () => {}
  context.app.ticker.start()
}

export function create (context) {
  const container = new Container()

  const easyButton = buttonMenu(context, [8, 8, 10], Constant.EASY_BUTTON_MESSAGE, 200)
  const mediumButton = buttonMenu(context, [16, 16, 40], Constant.MEDIUM_BUTTON_MESSAGE, 300)
  const hardButton = buttonMenu(context, [32, 32, 99], Constant.HARD_BUTTON_MESSAGE, 400)

  container.addChild(easyButton, mediumButton, hardButton)
  context.containers.menuContainer = container
}
