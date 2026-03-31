import mongoose, { Schema, Document } from 'mongoose';

interface MetadataColumn {
  name: string;
  type: string;
}

interface Metadata extends Document {
  _id: mongoose.Types.ObjectId;
  created_on: Date;
  name: string;
  database_name: string;
  schema_name: string;
  kind: string;
  comment?: string;
  cluster_by: string;
  rows: number;
  bytes: number;
  owner?: string;
  retention_time: number;
  dropped_on?: Date;
  automatic_clustering: string;
  change_tracking: string;
  search_optimization: string;
  search_optimization_progress?: number;
  search_optimization_bytes?: number;
  is_external: string;
  owner_role_type?: string;
  columns: MetadataColumn[];
}

const MetadataSchema: Schema<Metadata> = new Schema<Metadata>({
  _id: mongoose.Schema.Types.ObjectId,
  created_on: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  database_name: {
    type: String,
    required: true,
  },
  schema_name: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  cluster_by: {
    type: String,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  bytes: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
  },
  retention_time: {
    type: Number,
    required: true,
  },
  dropped_on: {
    type: Date,
  },
  automatic_clustering: {
    type: String,
    required: true,
  },
  change_tracking: {
    type: String,
    required: true,
  },
  search_optimization: {
    type: String,
    required: true,
  },
  search_optimization_progress: {
    type: Number,
  },
  search_optimization_bytes: {
    type: Number,
  },
  is_external: {
    type: String,
    required: true,
  },
  owner_role_type: {
    type: String,
  },
  columns: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model<Metadata>('Metadata', MetadataSchema);
