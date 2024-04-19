const generateEmptyMap = (width, height) => {
  const map = []

  for (let i = 0; i < width; i++) {
    const row = []
    for (let j = 0; j < height; j++) {
      row.push(0)
    }
    map.push(row)
  }

  return map
}

const placeMine = (map, width, height, mines) => {
  if (mines <= 0) return

  const i = Math.floor(Math.random() * width)
  const j = Math.floor(Math.random() * height)

  if (map[i][j] === 0) {
    map[i][j] = -1
    mines -= 1
    placeMine(map, width, height, mines)
  } else {
    placeMine(map, width, height, mines)
  }
}

const validateAndPlaceHelper = (map, i, j, width, height) => {
  if (i < 0 || i >= width) return
  if (j < 0 || j >= width) return

  if (map[i][j] !== -1) {
    map[i][j] += 1
  }
}

const placeHelper = (map, width, height) => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (map[i][j] === -1) {
        validateAndPlaceHelper(map, i, j - 1, width, height)
        validateAndPlaceHelper(map, i, j + 1, width, height)

        validateAndPlaceHelper(map, i + 1, j - 1, width, height)
        validateAndPlaceHelper(map, i + 1, j, width, height)
        validateAndPlaceHelper(map, i + 1, j + 1, width, height)

        validateAndPlaceHelper(map, i - 1, j - 1, width, height)
        validateAndPlaceHelper(map, i - 1, j, width, height)
        validateAndPlaceHelper(map, i - 1, j + 1, width, height)
      }
    }
  }
}

export function isOver (map, playMap, width, height, mines) {
  let count = 0
  let complete = true

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (playMap[i][j] === -1) {
        return [true, false]
      } else if (map[i][j] === -1 && playMap[i][j] === -3) {
        count += 1
      } else if (playMap[i][j] === 0) {
        complete = false
      }
    }
  }

  if (count === mines && complete) {
    return [true, true]
  } else {
    return [false, null]
  }
}

export function expandEmptyPlace (map, playMap, width, height, i, j) {
  if (i < 0 || i >= width) return
  if (j < 0 || j >= width) return

  if (map[i][j] === 0 && playMap[i][j] === 0) {
    playMap[i][j] = -2

    expandEmptyPlace(map, playMap, width, height, i, j - 1)
    expandEmptyPlace(map, playMap, width, height, i, j + 1)

    expandEmptyPlace(map, playMap, width, height, i + 1, j - 1)
    expandEmptyPlace(map, playMap, width, height, i + 1, j)
    expandEmptyPlace(map, playMap, width, height, i + 1, j + 1)

    expandEmptyPlace(map, playMap, width, height, i - 1, j - 1)
    expandEmptyPlace(map, playMap, width, height, i - 1, j)
    expandEmptyPlace(map, playMap, width, height, i - 1, j + 1)
  } else if (map[i][j] >= 1) {
    playMap[i][j] = map[i][j]
  }
}

export async function generateMap (width, height, mines) {
  const map = generateEmptyMap(width, height)
  const playMap = generateEmptyMap(width, height)

  await placeMine(map, width, height, mines)
  await placeHelper(map, width, height)

  return [map, playMap]
}

export function minePlayed (playMap, x, y) {
  let count = 0

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (playMap[i][j] === -3) {
        count += 1
      }
    }
  }

  return count
}
