<script lang="ts" setup>

    const navLinks = ref<{
        to: string,
        label: string
    }[]>([
        {
            to:'/',
            label:'Home'
        },
        {
            to:'/about',
            label:'About'
        },
        {
            to:'/contact',
            label:'Contact'
        }

    ])
</script>

<template>
    <div class="fixed top-0 left-0 right-0 border-b border-delft_blue/30 bg-blur">
        <nav class="container py-4 flex justify-between">
            <NuxtLink
                :to="{
                    name:'index'
                }"
                class="text-2xl font-bold ">
                IF_URL_Shortener
            </NuxtLink>
            <ul class="flex items-center gap-4">
                <Li v-for="link in navLinks" :key="link.to"><NuxtLink :to="link.to">{{ link.label }}</NuxtLink></Li>
                <li><NuxtLink to="/auth" class="btn btn-primary">Sign In</NuxtLink></li>
            </ul>
        </nav>
    </div>
</template>