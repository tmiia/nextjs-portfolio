import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";

const fetchHomeData = async () => {
  const storyblokApi = getStoryblokApi();
  try {
    const response = await storyblokApi.get('cdn/stories/home', {
      version: 'published'
    });
    return response;
  } catch (error) {
    console.error("Error fetching from Storyblok:", error);
    throw error;
  }
}

const Home = async () => {
  try {
    const { data } = await fetchHomeData();

    return (
        <StoryblokStory story={data.story} />
    );
  } catch (error : any) {
    console.error("Error in Home component:", error);
  }
}

export default Home;
