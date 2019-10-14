import { IGitGubRepository } from 'src/app/models/repository.model';

export class RepositorySearchResult {
  public constructor(
    public items: IGitGubRepository[],
    public totalCount: number
  ) {}
}

