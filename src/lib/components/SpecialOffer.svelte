<script lang="ts">

	export let offerData: {
		text: string;
        isLink: boolean;
        link?: string | undefined;

	};
</script>

<div class="bg-gray-950 text-center text-white font-jura uppercase p-1 sm:text-lg text-sm sticky w-full top-[-100px]">
    <a href={offerData.link} class={`${offerData.isLink ? 'block' : 'hidden'} text-center`}>{offerData.text}</a>
    {!offerData.isLink ? offerData.text : ''}
</div>
