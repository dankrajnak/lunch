<script lang="ts">
  type $$Props = svelteHTML.IntrinsicElements["button"];
</script>

<button
  {...$$props}
  on:click
  class={`btn p-2 rounded-none variant-soft w-full ${$$props?.class ?? ""}`}
>
  <slot />
</button>
