<script lang="ts">
  import { collectionStore } from "sveltefire";
  import { enhance } from "$app/forms";
  import { db } from "$lib/client/firebase";
  import { addDoc, collection } from "firebase/firestore";
  const posts = collectionStore<{ content: string }>(db, "posts");
  let inputValue = "";
</script>

<div class="container mx-auto">
  <!-- {JSON.stringify($posts)} -->
  <!-- <p>Fetched {count} documents</p> -->
  <ul>
    {#each $posts as post}
      <li>{post.content}</li>
    {/each}
  </ul>
  <hr />

  <form method="POST" use:enhance>
    <div class="space-y-4">
      <div>
        <label
          for="contents"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Content</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            autocomplete="off"
            type="text"
            name="content"
            class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Content"
          />
        </div>
      </div>
      <button
        class="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >Submit
      </button>
    </div>
  </form>
  <hr />
  <p>Current input value: {inputValue}</p>
  <button
    on:click={() => addDoc(collection(db, "posts"), { content: inputValue })}
    >Other submit</button
  >
</div>
