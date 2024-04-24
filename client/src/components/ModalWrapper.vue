<script setup>
defineProps({ modalId: String })
</script>


<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    {{ modalId }}
                </div>
                <div class="modal-body">
                    <slot>

                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>