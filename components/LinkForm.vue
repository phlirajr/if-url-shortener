<script lang="ts" setup>

const url = ref('');
const ifsk = ref('')

</script>

<template>
    <div class="card">
        <form>
            <div class="flex gap-5 items-end">
                <div class="w-5/12">
                    <label for="url">ORIGINAL URL:</label>
                    <input type="text" id="url" v-model="url"/>
                </div>
                <div class="w-5/12">
                    <label for="IFSK">IF SHORT KEY:</label>
                    <input type="text" id="IFSK" v-model="ifsk">
                </div>
                <div class="w-1/6">
                    <button class="btn-primary px-2 py-2 my-2 rounded-md w-full">Encurtar</button>
                </div>
            </div>
        </form>
    </div>
</template>