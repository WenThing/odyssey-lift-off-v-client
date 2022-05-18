import React from "react";
import { Layout,  QueryResult} from "../components";
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";

export const TRACKS = gql`
  query getTracksForHome {
    tracksForHome {
      id
      title
      thumbnail
      durationInSeconds
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;
/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);
  // if loading is true, indicating the query is still in flight, front end component can just render a "Loading.." message
  // once done loading, either have error or data
  return (
    <Layout grid>
      
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
