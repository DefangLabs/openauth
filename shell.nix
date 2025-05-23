{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    pkgs.nixfmt
    pkgs.nodejs_20
    pkgs.pulumi-bin
    pkgs.hasura-cli
    pkgs.nodePackages.pnpm
  ];
}
