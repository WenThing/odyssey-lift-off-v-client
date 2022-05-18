import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import TrackDetail from "../components/track-detail";

// export keyword so the query is available in our test case
export const GET_TRACK = gql`
  query getTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      durationInSeconds
      modulesCount
      description
      numberOfViews
      modules {
        id
        title
        durationInSeconds
      }
    }
  }
`;

// build the Track page layout
const Track = ({ trackId }) => {
  //use useQuery hook to get data
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId },
  });
  return (
    <Layout>
          <QueryResult error={error} loading={loading} data={data}>
              <TrackDetail track={data?.track}/>
      </QueryResult>
    </Layout>
  );
};

export default Track;
