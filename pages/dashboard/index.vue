<script lang="ts" setup>
import LinkForm from '~/components/LinkForm.vue';
    definePageMeta({
        middleware:"auth"
    });
</script>

<template>
    <main class="pt-28">
        <section class="container">
            <h1 class="text-4xl font-bold text-delft.blue uppercase">Dashboard</h1>
        </section>
        <section class="container mt-10">
            <LinkForm/>
        </section>
        <section class="container mt-10">
            <LinkItem
                v-for="i in 10"
                :key="i"
                :link="{
                    ifsk:'test',
                    url: 'https://www.google.com/um-exemplo-de-url-desnecessariamente-muuuuuuitooooo-graaaaaande',
                    id: '1'
                }"/>
        </section>
    </main>
</template>