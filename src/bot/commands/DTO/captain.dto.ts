import { Param } from "@discord-nestjs/core";
export class captainDTO {
  @Param({
    name: "팀장",
    description: "들어가고싶은팀 팀장",
    required: true,
  })
  captain: string;
}
