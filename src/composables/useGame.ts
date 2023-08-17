import { reactive } from 'vue'

const DEFAULT_GAME = {
  speed: 0,
  initSpeed: 0.00035,
  baseSpeed: 0.00035,
  targetBaseSpeed: 0.00035,
  incrementSpeedByTime: 0.0000025,
  incrementSpeedByLevel: 0.000005,
  distanceForSpeedUpdate: 100,
  speedLastUpdate: 0,

  distance: 0,
  ratioSpeedDistance: 50,
  energy: 100,
  ratioSpeedEnergy: 3,

  level: 1,
  levelLastUpdate: 0,
  distanceForLevelUpdate: 1000,

  planeDefaultHeight: 100,
  planeAmpHeight: 80,
  planeAmpWidth: 75,
  planeMoveSensivity: 0.005,
  planeRotXSensivity: 0.0008,
  planeRotZSensivity: 0.0004,
  planeFallSpeed: 0.001,
  planeMinSpeed: 1.2,
  planeMaxSpeed: 1.6,
  planeSpeed: 0,
  planeCollisionDisplacementX: 0,
  planeCollisionSpeedX: 0,

  planeCollisionDisplacementY: 0,
  planeCollisionSpeedY: 0,

  seaRadius: 600,
  seaLength: 800,
  // seaRotationSpeed:0.006,
  wavesMinAmp: 5,
  wavesMaxAmp: 20,
  wavesMinSpeed: 0.001,
  wavesMaxSpeed: 0.003,

  cameraFarPos: 500,
  cameraNearPos: 150,
  cameraSensivity: 0.002,

  coinDistanceTolerance: 15,
  coinValue: 3,
  coinsSpeed: 0.5,
  coinLastSpawn: 0,
  distanceForCoinsSpawn: 100,

  ennemyDistanceTolerance: 10,
  ennemyValue: 10,
  ennemiesSpeed: 0.6,
  ennemyLastSpawn: 0,
  distanceForEnnemiesSpawn: 50,

  status: 'playing' as 'playing' | 'gameover' | 'waitingReplay',
}

const game = reactive({ ...DEFAULT_GAME })

export function useGame() {
  function resetGame() {
    Object.assign(game, DEFAULT_GAME)
  }

  function addEnergy() {
    game.energy += game.coinValue
    game.energy = Math.min(game.energy, 100)
  }

  function removeEnergy() {
    game.energy -= game.ennemyValue
    game.energy = Math.max(0, game.energy)
  }

  return { game, resetGame, addEnergy, removeEnergy }
}
