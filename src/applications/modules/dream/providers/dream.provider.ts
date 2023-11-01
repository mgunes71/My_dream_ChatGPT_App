import { DreamEntity } from "../../../../core/database/models/dream.model";

export const dreamProvider = [
  {
    provide: 'DREAM_REPOSITORY',
    useValue: DreamEntity
  }
]
