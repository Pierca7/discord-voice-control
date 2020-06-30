/* eslint-disable no-console */
import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Providers, PlaylistDTO } from "../data-objects/playlist";
import PlaylistManager from "../data-access/playlists";

const providers = Object.values(Providers);
// eslint-disable-next-line new-cap
const router: Router = Router();

/**
 * Add a playlist
 */
router.post(
  "/",
  [
    check("url", "The URL of the playlist is required").not().isEmpty(),
    check("url", "Invalid url. Please check the format of your input").isURL(),
    check("provider", "The provider of playlist is required").not().isEmpty(),
    check(
      "provider",
      `Invalid value. The allowed values are: ${providers.join(", ")}.`,
    ).isIn(providers),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });

      return;
    }

    try {
      const playlistDto = await PlaylistDTO.createFromSpotify(
        req.body.url,
        String(Math.random()),
      );

      const playlist = await PlaylistManager.create(playlistDto);

      res.json(playlist);
    } catch (err) {
      console.error(err);
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
      return;
    }
  },
);

/**
 * Get all playlists for a user
 */
router.get(
  "/",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const playlists = await PlaylistManager.getAll();

      res.json(playlists);
    } catch (err) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  },
);

/**
 * Get a playlists by id
 */
router.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const playlistId = ((req || {}).params || {}).id;

      if (!playlistId || isNaN(parseInt(playlistId, 10))) {
        res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ msg: "Your ID is invalid. Please use an integer number." });

        return;
      }

      const playlist = await PlaylistManager.getById(playlistId);

      if (!playlist) {
        res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ msg: "Playlist not found" });

        return;
      }

      res.json(playlist);
    } catch (err) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  },
);

/**
 * Delete playlist by id
 */
router.delete(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const playlistId = ((req || {}).params || {}).id;

      if (!playlistId || isNaN(parseInt(playlistId, 10))) {
        res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ msg: "Your ID is invalid. Please use an integer number." });

        return;
      }

      await PlaylistManager.deleteById(playlistId);

      res.status(HttpStatusCodes.NO_CONTENT).json({ msg: "Playlist removed" });
    } catch (err) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  },
);

export default router;