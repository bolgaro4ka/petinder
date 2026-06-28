<script setup lang="ts">
import { animate } from 'motion'
import { computed, nextTick, ref } from 'vue'

type PetCard = {
    name: string
    age: number
    likes: number
    photo: string
    host_name: string
    host_phone: string
}

const props = defineProps<{
    pets: PetCard[]
}>()

const currentIndex = ref(0)
const dragOffset = ref(0)
const dragStartX = ref(0)
const isDragging = ref(false)
const currentDecision = ref<'like' | 'dislike' | null>(null)
const isRevealed = ref(false)
const isAwaitingContinue = ref(false)
const likedPets = ref<PetCard[]>([])
const rejectedPets = ref<PetCard[]>([])
const topCardRef = ref<HTMLElement | null>(null)
const activePointerId = ref<number | null>(null)

const visiblePets = computed(() => props.pets.slice(currentIndex.value, currentIndex.value + 3))
const currentPet = computed(() => visiblePets.value[0] ?? null)
const nextPet = computed(() => visiblePets.value[1] ?? null)
const thirdPet = computed(() => visiblePets.value[2] ?? null)
const hasMorePets = computed(() => currentIndex.value < props.pets.length)
const swipeIndicator = computed(() => {
    if (dragOffset.value > 40) {
        return { label: 'НРАВИТСЯ', color: 'var(--primary-color)' }
    }

    if (dragOffset.value < -40) {
        return { label: 'НЕ НРАВИТСЯ', color: '#ff6b6b' }
    }

    return null
})

function normalizePhoto(photo: string) {
    return photo.startsWith('/public/') ? photo.replace('/public', '') : photo
}

function resetCardState() {
    dragOffset.value = 0
    dragStartX.value = 0
    isDragging.value = false
    currentDecision.value = null
    isRevealed.value = false
    isAwaitingContinue.value = false
    activePointerId.value = null
}

function animateTopCard(x: number, rotate: number, scale: number, opacity = 1) {
    const element = topCardRef.value
    if (!element) return

    const currentX = dragOffset.value
    const currentRotate = currentX / 16
    const currentScale = Math.max(0.94, 1 - Math.abs(currentX) / 1400)

    animate(
        element,
        {
            x: [currentX, x],
            rotate: [currentRotate, rotate],
            scale: [currentScale, scale],
            opacity: [1, opacity],
        },
        {
            duration: 0.5,
            easing: [0.22, 1, 0.36, 1],
        }
    )
}

function advanceCard() {
    currentIndex.value += 1
    resetCardState()

    nextTick(() => {
        animateTopCard(0, 0, 1, 1)
    })
}

function makeDecision(decision: 'like' | 'dislike') {
    if (!currentPet.value || currentDecision.value) return

    currentDecision.value = decision

    if (decision === 'like') {
        likedPets.value.push(currentPet.value)
        isRevealed.value = true
        dragOffset.value = 0
        isAwaitingContinue.value = true
        isDragging.value = false
        activePointerId.value = null
        return
    }

    rejectedPets.value.push(currentPet.value)
    animateTopCard(-420, -18, 0.95, 0.94)

    window.setTimeout(() => {
        advanceCard()
    }, 520)
}

function onPointerDown(event: PointerEvent) {
    if (!currentPet.value || isRevealed.value || currentDecision.value) return

    event.preventDefault()
    dragStartX.value = event.clientX
    isDragging.value = true
    activePointerId.value = event.pointerId
        ; (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
    if (!isDragging.value || !currentPet.value || currentDecision.value) return
    if (activePointerId.value !== null && event.pointerId !== activePointerId.value) return

    dragOffset.value = event.clientX - dragStartX.value
}

function onPointerUp(event: PointerEvent) {
    if (!isDragging.value || !currentPet.value || currentDecision.value) return
    if (activePointerId.value !== null && event.pointerId !== activePointerId.value) return

    const delta = event.clientX - dragStartX.value
    const target = event.currentTarget as HTMLElement
    if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId)
    }

    if (delta > 120) {
        makeDecision('like')
    } else if (delta < -120) {
        makeDecision('dislike')
    } else {
        animateTopCard(0, 0, 1, 1)
        dragOffset.value = 0
        isDragging.value = false
        activePointerId.value = null
    }
}

function handleManualDecision(decision: 'like' | 'dislike') {
    if (!currentPet.value || currentDecision.value || isRevealed.value) return
    makeDecision(decision)
}

function continueToNextPet() {
    if (!isAwaitingContinue.value) return
    advanceCard()
}

function cardStyle(index: number) {
    if (index === 0) {
        if (currentDecision.value === 'dislike') {
            return {
                transform: 'translateX(-420px) rotate(-18deg) scale(0.95)',
                zIndex: 30,
                opacity: 0.94,
            }
        }

        if (currentDecision.value === 'like' || isRevealed.value) {
            return {
                transform: 'translateX(0px) rotate(0deg) scale(1)',
                zIndex: 30,
                opacity: 1,
            }
        }

        const rotate = dragOffset.value / 16
        const scale = Math.max(0.94, 1 - Math.abs(dragOffset.value) / 1400)

        return {
            transform: `translateX(${dragOffset.value}px) rotate(${rotate}deg) scale(${scale})`,
            zIndex: 30,
            opacity: 1,
        }
    }

    const depth = index * 12
    const scale = Math.max(0.92, 1 - index * 0.04)

    return {
        transform: `translateY(${depth}px) scale(${scale})`,
        zIndex: 30 - index,
        opacity: index === 1 ? 0.94 : 0.84,
    }
}
</script>

<template>
    <section class="deck">


        <div v-if="hasMorePets && currentPet" class="deck__stage">
            <div class="deck__stack">
                <div v-if="thirdPet" class="pet-card pet-card--back" :style="cardStyle(2)">
                    <div class="pet-card__inner">
                        <div class="pet-card__surface">
                            <img :src="normalizePhoto(thirdPet.photo)" :alt="thirdPet.name" loading="lazy"
                                decoding="async" />
                            <div class="pet-card__content">
                                <h2>{{ thirdPet.name }}</h2>
                                <p>{{ thirdPet.age }} лет · {{ thirdPet.likes }} лайков</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="nextPet" class="pet-card pet-card--back" :style="cardStyle(1)">
                    <div class="pet-card__inner">
                        <div class="pet-card__surface">
                            <img :src="normalizePhoto(nextPet.photo)" :alt="nextPet.name" loading="lazy"
                                decoding="async" />
                            <div class="pet-card__content">
                                <h2>{{ nextPet.name }}</h2>
                                <p>{{ nextPet.age }} лет · {{ nextPet.likes }} лайков</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="currentPet" ref="topCardRef" class="pet-card pet-card--top"
                    :class="{ 'pet-card--revealed': isRevealed, 'pet-card--like': currentDecision === 'like', 'pet-card--dislike': currentDecision === 'dislike' }"
                    :style="cardStyle(0)" @pointerdown="onPointerDown" @pointermove="onPointerMove"
                    @pointerup="onPointerUp" @pointercancel="onPointerUp">
                    <div class="pet-card__indicator" v-if="swipeIndicator"
                        :style="{ borderColor: swipeIndicator.color, color: swipeIndicator.color }">
                        {{ swipeIndicator.label }}
                    </div>

                    <div class="pet-card__inner">
                        <div class="pet-card__face pet-card__face--front">
                            <img :src="normalizePhoto(currentPet.photo)" :alt="currentPet.name" loading="lazy"
                                decoding="async" />
                            <div class="pet-card__content">
                                <div class="pet-card__title-row">
                                    <div>
                                        <h2>{{ currentPet.name }}</h2>
                                        <p>{{ currentPet.age }} лет · {{ currentPet.likes }} лайков</p>
                                    </div>
                                    <span class="pet-card__badge">NEW</span>
                                </div>
                                <p class="pet-card__hint">Свайпните в сторону, чтобы выбрать или пропустить.</p>
                            </div>
                        </div>

                        <div class="pet-card__face pet-card__face--back">
                            <div class="pet-card__contact">
                                <p class="pet-card__eyebrow">Контакты хозяина</p>
                                <h2>{{ currentPet.host_name }}</h2>
                                <p>{{ currentPet.host_phone }}</p>
                                <p>Пишите, если питомец вам понравился.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isAwaitingContinue" class="deck__actions deck__actions--single">
                <button class="deck__button deck__button--like" @click="continueToNextPet">
                    Продолжить
                </button>
            </div>

            <div v-else class="deck__actions">
                <button class="deck__button deck__button--skip" @click="handleManualDecision('dislike')">
                    Пропустить
                </button>
                <button class="deck__button deck__button--like" @click="handleManualDecision('like')">
                    Мне нравится
                </button>
            </div>
        </div>

        <div v-else class="deck__empty">
            <h2>Пока больше нет новых карточек</h2>
            <p>Вы посмотрели все доступные питомцы. Скоро добавим сохранение лайков и больше данных.</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.deck {
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
    color: var(--on-primary-color);
}



.deck__eyebrow {
    margin: 0 0 0.2rem;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-primary-color);
}

.deck__stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
    color: var(--on-primary-color);
    font-size: 0.95rem;
}

.deck__stage {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;
}

.deck__stack {
    position: relative;
    min-height: 480px;
    z-index: 20;
}

.pet-card {
    position: absolute;
    z-index: 10;
    inset: 0;
    border-radius: 28px;
    overflow: hidden;
    background: var(--primary-color);
    touch-action: none;
    user-select: none;
    perspective: 1000px;
    will-change: transform;
}

.pet-card--top {
    cursor: grab;
}

.pet-card--top:active {
    cursor: grabbing;
}

.pet-card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.pet-card--revealed .pet-card__inner {
    transform: rotateY(180deg);
}

.pet-card__face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
}

.pet-card__face--front {
    display: flex;
    flex-direction: column;
}

.pet-card__face--back {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--triary-color);
    transform: rotateY(180deg);
}

.pet-card__surface {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.pet-card img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    background: var(--surface-color);
}

.pet-card__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.2rem;

}

.pet-card__title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.pet-card h2 {
    margin: 0 0 0.25rem;
    font-size: 1.35rem;
    color: var(--on-primary-color);
}

.pet-card p {
    margin: 0;
    color: var(--on-primary-color);
}

.pet-card__badge {
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    background: var(--secondary-color);
    color: var(--on-primary-color);
    font-size: 0.8rem;
    font-weight: 600;
}

.pet-card__hint {
    margin-top: 0.7rem;
    font-size: 0.95rem;
    color: var(--text-primary-color);
}

.pet-card__contact {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: center;
    color: var(--on-primary-color);
}

.pet-card__contact h2 {
    font-size: 1.4rem;
}

.pet-card__contact p {
    color: var(--on-primary-color);
}

.pet-card__indicator {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 5;
    padding: 0.5rem 0.8rem;
    border: 2px solid currentColor;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(10px);
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.deck__actions {
    display: flex;
    gap: 0.75rem;
}

.deck__actions--single {
    justify-content: center;
}

.deck__button {
    flex: 1;
    border: none;
    border-radius: 999px;
    padding: 0.95rem 1rem;
    font-weight: 600;
    color: var(--text-primary-color);
    background: var(--surface-color);
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.deck__button::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.deck__button:active::after {
    opacity: 1;
    transform: scale(1.15);
}

.deck__button--like {
    background: var(--secondary-color);
    color: var(--on-primary-color);
}

.deck__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    padding: 2rem;
    border: 1px solid var(--outline-color);
    border-radius: 24px;
    background: var(--surface-color);
    color: var(--text-secondary-color);
}

@media (max-width: 640px) {
    .deck {
        padding: 1rem;
    }

    .deck__header {
        flex-direction: column;
        align-items: flex-start;
    }

    .deck__stats {
        align-items: flex-start;
    }

    .deck__stack {
        min-height: 520px;
    }
}
</style>
