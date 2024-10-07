export interface EventDataProp {
    "id": number;
    "body": string;
    "filename": string | null;
    "arrival_time_abs"?: string | null;
    "arrival_time_rel"?: string | null;
    "evid"?: string | null;
    "mq_type"?: string | null;
    "network"?: string | null;
    "station"?: string | null;
    "location"?: string | null;
    "channel"?: string | null;
    "starttime": string | null;
    "endtime": string | null;
    "sampling_rate"?: number | null;
    "delta"?: number | null;
    "npts"?: number | null;
    "calib"?: number | null;
    "mseed"?: number | null | object;
}
