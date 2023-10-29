<script lang="ts">
  let elemCarousel: HTMLDivElement;
  const unsplashIds = [
    "vjUokUWbFOs",
    "1aJuPtQJX_I",
    "Jp6O3FFRdEI",
    "I3C_eojFVQY",
    "s0fXOuyTH1M",
    "z_X0PxmBuIQ",
  ];

  const left = (): void => {
    const x =
      elemCarousel.scrollLeft === 0
        ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
        : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
    elemCarousel.scroll(x, 0);
  };

  const right = (): void => {
    const x =
      elemCarousel.scrollLeft ===
      elemCarousel.scrollWidth - elemCarousel.clientWidth
        ? 0 // loop
        : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
    elemCarousel.scroll(x, 0);
  };
</script>

<div
  class="previewer-preview justify-center items-center mx-auto transition-[width] duration-200 w-full grid grid-cols-1 gap-4"
>
  <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
    <!-- Button: Left -->
    <button type="button" class="btn-icon variant-filled" on:click={left}>
      <i class="fa-solid fa-arrow-left" />
    </button>
    <!-- Full Images -->
    <div
      bind:this={elemCarousel}
      class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto"
    >
      {#each unsplashIds as unsplashId}
        <img
          class="snap-center w-[1024px] rounded-container-token"
          src="https://source.unsplash.com/{unsplashId}/1024x768"
          alt={unsplashId}
          loading="lazy"
        />
      {/each}
    </div>
    <!-- Button: Right -->
    <button type="button" class="btn-icon variant-filled" on:click={right}>
      <i class="fa-solid fa-arrow-right" />
    </button>
  </div>
</div>
