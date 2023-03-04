<template>
  <span :class="`badge ${color()}`">{{ text() }}</span>
</template>

<script setup lang="ts">
import {Service} from '~/types';

const props = defineProps<{
  service: Service;
}>();

function text(): string {
  switch (props.service.action) {
    case 'clean':
      return 'Schoonmaken';
    case 'inspect':
      return 'Controleren';
    case 'replace':
      return 'Vervangen';
    case 'tighten':
      return 'Vastdraaien';
  }
}

function color(): string {
  switch (props.service.action) {
    case 'clean':
      return 'badge bg-success';
    case 'inspect':
      return 'badge bg-warning';
    case 'replace':
      return 'badge bg-danger';
    case 'tighten':
      return 'bagde bg-primary';
  }
}
</script>