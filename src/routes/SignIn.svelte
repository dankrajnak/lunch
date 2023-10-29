<script lang="ts">
  import SubmitButton from "$lib/components/SubmitButton.svelte";

  import { TelInput } from "svelte-tel-input";

  import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    PhoneAuthProvider,
    type ConfirmationResult,
    signInWithCredential,
  } from "firebase/auth";
  import { auth } from "$lib/client/firebase";
  import { onMount } from "svelte";
  import PhoneIcon from "svelte-material-icons/PhoneOutline.svelte";
  import type { DetailedValue, E164Number } from "svelte-tel-input/types";

  let verifier: RecaptchaVerifier;
  onMount(() => {
    verifier = new RecaptchaVerifier(auth, "sign-in", {
      size: "invisible",
    });
  });

  let valid: boolean = true;
  let value: E164Number | null = null;
  let detailedValue: Partial<DetailedValue> | null = null;

  let onConfirm = false;
  let confirmationResult: ConfirmationResult | null = null;

  let submittingPromise: Promise<unknown> | null = null;
  let code: string | null = null;

  const handleSubmit = async () => {
    if (detailedValue?.isValid && detailedValue.phoneNumber) {
      confirmationResult = await signInWithPhoneNumber(
        auth,
        detailedValue?.phoneNumber,
        verifier
      );
      onConfirm = true;
    }
  };
</script>

<div class="flex items-center flex-col justify-center h-full">
  <div class="w-96 flex items-center flex-col space-y-5">
    <h1 class="h1 leading-tight font-bold text-center">
      {#if onConfirm}
        What's the secret code?
      {:else}
        Let&apos;s Have Lunch!
      {/if}
    </h1>
    {#if onConfirm}
      <input
        class="input variant-form-material"
        placeholder="Code"
        bind:value={code}
      />
      <SubmitButton
        on:click={async () => {
          if (code && confirmationResult) {
            const cred = await PhoneAuthProvider.credential(
              confirmationResult.verificationId,
              code
            );
            signInWithCredential(auth, cred);
          }
        }}
      >
        Verify
      </SubmitButton>
    {:else}
      <div class={`transform-style-3d transition ease-in-out duration-1000`}>
        <div class="w-full" style={"transform: rotateY(0) translateZ(96px)"}>
          <div
            class={`input-group my-6 variant-form-material input-group-divider grid-cols-[auto_1fr_auto]`}
          >
            <div class="input-group-shim"><PhoneIcon /></div>
            <TelInput
              id="tel-input"
              country="US"
              bind:detailedValue
              bind:value
              bind:valid
              on:keydown={(e) => {
                const length = detailedValue?.nationalNumber?.length;
                if (length && length >= 10 && e.key >= "0" && e.key <= "9") {
                  e.preventDefault();
                }
              }}
              placeholder="Phone number"
              options={{ autoPlaceholder: false }}
              required
            />
          </div>
          {#await submittingPromise}
            <SubmitButton disabled>Submitting...</SubmitButton>
          {:then _}
            <SubmitButton
              on:click={() => {
                submittingPromise = handleSubmit();
              }}
            >
              Submit
            </SubmitButton>
          {/await}
          <div id="sign-in" />

          <div>
            <small class="text-surface-700 text-xs">
              This site is protected by reCAPTCHA. The Google
              <a
                class="text-surface-300"
                href="https://policies.google.com/privacy"
              >
                Privacy Policy
              </a>
              and
              <a
                class="text-surface-300"
                href="https://policies.google.com/terms"
              >
                Terms of Service
              </a>
              apply.
            </small>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
