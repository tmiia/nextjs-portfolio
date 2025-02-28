import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";

const fetchHomeData = async () => {
  const storyblokApi = getStoryblokApi();
  try {
    const response = await storyblokApi.get('cdn/stories/home', {
      version: 'draft'
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
    console.log("Story data received:", data);

    return (
      <div className="container mx-auto">
        <StoryblokStory story={data.story} />
      </div>
    );
  } catch (error : any) {
    console.error("Error in Home component:", error);
    return <div className="p-8 bg-red-100">Error loading content: {error.message || 'Unknown error'}</div>;
  }
}

export default Home;
