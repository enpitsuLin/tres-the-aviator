<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import Game from './components/Game.vue'
import GithubCorners from './components/GithubCorners.vue'
import { useGame } from './composables/useGame'
import './styles/demo.css'
import './styles/game.css'

const { game, resetGame } = useGame()

useEventListener(document, ['mouseup', 'touchend'], () => {
  if (game.status === 'waitingReplay')
    resetGame()
})
</script>

<template>
  <GithubCorners />
  <div class="game-holder">
    <div class="header">
      <h1><span>the</span>Aviator</h1>
      <h2>fly it to the end</h2>
      <div id="score" class="score">
        <div id="level" class="score__content">
          <div class="score__label">
            level
          </div>
          <div id="levelValue" class="score__value score__value--level">
            {{ game.level }}
          </div>
          <svg id="levelCircle" class="level-circle" viewBox="0 0 200 200">
            <circle id="levelCircleBgr" r="80" cx="100" cy="100" fill="none" stroke="#d1b790" stroke-width="24px" />
            <circle
              id="levelCircleStroke"
              r="80" cx="100" cy="100"
              fill="none" stroke="#68c3c0" stroke-width="14px" stroke-dasharray="502"
              :stroke-dashoffset="502 * (1 - (game.distance % game.distanceForLevelUpdate) / game.distanceForLevelUpdate)"
            />
          </svg>
        </div>
        <div id="dist" class="score__content">
          <div class="score__label">
            distance
          </div>
          <div id="distValue" class="score__value score__value--dist">
            {{ Math.floor(game.distance) }}
          </div>
        </div>
        <div id="energy" class="score__content">
          <div class="score__label">
            energy
          </div>
          <div id="energyValue" class="score__value score__value--energy">
            <div
              id="energyBar" class="energy-bar"
              :style="{
                right: `${100 - game.energy}%`,
                backgroundColor: (game.energy < 50) ? '#f25346' : '#68c3c0',
                animationName: game.energy < 30 ? 'blinking' : 'none',
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="world" class="world">
      <TresCanvas
        alpha
        antialias
        use-legacy-lights
        class="game-holder"
      >
        <TresPerspectiveCamera
          :position="[0, 200, game.planeDefaultHeight]"
        />
        <TresFog :args="[0xF7D9AA, 100, 950]" />
        <Game />
      </TresCanvas>
    </div>
    <div v-show="game.status === 'waitingReplay'" id="replayMessage" class="message message--replay">
      Click to Replay
    </div>
    <div id="instructions" class="message message--instructions">
      Grab the blue pills<span>avoid the red ones</span>
    </div>
  </div>
</template>
