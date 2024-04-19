import { Assets, Container, Sprite, TextStyle, Text } from 'pixi.js'
import * as Constant from '../constants'

export async function loadTextures () {
  const textures = {}

  for (let i = 0; i < Constant.TEXTURES.length; i++) {
    textures[i] = await Assets.load(Constant.TEXTURES[i])
  }

  return textures
}

const textStyle = new TextStyle({
  fontFamily: Constant.FONT_FAMILY,
  fontSize: Constant.FONT_SIZE,
  fill: Constant.FONT_COLOR
})

export function createText (text, x, y) {
  const buttonText = new Text({ text, style: textStyle })
  buttonText.anchor.set(0.5)
  buttonText.position.set(x, y)

  return buttonText
}

export function createButton (texture, text, x, y, onClick) {
  const buttonContainer = new Container()
  buttonContainer.position.set(x, y)

  const button = new Sprite(texture)
  button.width = Constant.WIDTH_BUTTON
  button.height = Constant.HEIGHT_BUTTON
  button.interactive = true
  button.buttonMode = true
  button.on('pointerdown', onClick)

  const buttonText = createText(text, button.width / 2, button.height / 2)
  buttonContainer.addChild(button, buttonText)

  return buttonContainer
}
